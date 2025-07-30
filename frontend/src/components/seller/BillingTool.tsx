import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Minus,
  Search,
  Receipt,
  User,
  Phone,
  Mail,
  Calculator,
  Check,
  X,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
}

interface BillingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  tax: number;
  discount: number;
}

const BillingTool: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, InvoiceItem>>(new Map());
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<BillingFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
    tax: 0,
    discount: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchInvoices();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products.filter((p: Product) => p.quantity > 0));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/billing/invoices', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const addProductToBill = (product: Product) => {
    const newSelectedProducts = new Map(selectedProducts);
    const existingItem = newSelectedProducts.get(product._id);
    
    if (existingItem) {
      if (existingItem.quantity < product.quantity) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * product.price;
        newSelectedProducts.set(product._id, existingItem);
      }
    } else {
      newSelectedProducts.set(product._id, {
        productId: product._id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        totalPrice: product.price
      });
    }
    
    setSelectedProducts(newSelectedProducts);
  };

  const updateQuantity = (productId: string, change: number) => {
    const newSelectedProducts = new Map(selectedProducts);
    const item = newSelectedProducts.get(productId);
    const product = products.find(p => p._id === productId);
    
    if (item && product) {
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        newSelectedProducts.delete(productId);
      } else if (newQuantity <= product.quantity) {
        item.quantity = newQuantity;
        item.totalPrice = item.quantity * item.unitPrice;
        newSelectedProducts.set(productId, item);
      }
    }
    
    setSelectedProducts(newSelectedProducts);
  };

  const removeFromBill = (productId: string) => {
    const newSelectedProducts = new Map(selectedProducts);
    newSelectedProducts.delete(productId);
    setSelectedProducts(newSelectedProducts);
  };

  const calculateSubtotal = () => {
    return Array.from(selectedProducts.values()).reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + formData.tax - formData.discount;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tax' || name === 'discount' ? parseFloat(value) || 0 : value
    }));
  };

  const createInvoice = async () => {
    if (selectedProducts.size === 0 || !formData.customerName.trim()) {
      alert('Please add products and customer name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/billing/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          items: Array.from(selectedProducts.values()),
          tax: formData.tax,
          discount: formData.discount,
          notes: formData.notes
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setCurrentInvoice(data.invoice);
        setShowInvoiceForm(true);
        await fetchInvoices();
      } else {
        alert(data.message || 'Error creating invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice');
    } finally {
      setLoading(false);
    }
  };

  const confirmInvoice = async (paymentMethod: string) => {
    if (!currentInvoice) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/billing/invoice/${currentInvoice._id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ paymentMethod })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Invoice confirmed and stock updated!');
        resetBill();
        await fetchProducts();
        await fetchInvoices();
      } else {
        alert(data.message || 'Error confirming invoice');
      }
    } catch (error) {
      console.error('Error confirming invoice:', error);
      alert('Error confirming invoice');
    } finally {
      setLoading(false);
    }
  };

  const resetBill = () => {
    setSelectedProducts(new Map());
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      notes: '',
      tax: 0,
      discount: 0
    });
    setCurrentInvoice(null);
    setShowInvoiceForm(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const selectedItem = selectedProducts.get(product._id);
    const isSelected = !!selectedItem;
    const maxQuantity = product.quantity - (selectedItem?.quantity || 0);

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
          isSelected
            ? isDarkMode
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-blue-500 bg-blue-50'
            : isDarkMode
              ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
              : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
        onClick={() => !isSelected && addProductToBill(product)}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {product.name}
          </h4>
          <span className={`text-sm px-2 py-1 rounded ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {product.category}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-lg font-bold ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            ₹{product.price}
          </span>
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Stock: {product.quantity}
          </span>
        </div>

        {isSelected && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product._id, -1);
                }}
                className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                <Minus className="h-3 w-3" />
              </button>
              
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedItem?.quantity}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product._id, 1);
                }}
                disabled={maxQuantity <= 0}
                className="p-1 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromBill(product._id);
              }}
              className="p-1 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Billing Tool</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create invoices and manage billing</p>
        </div>
        {selectedProducts.size > 0 && (
          <div className="flex space-x-3">
            <button onClick={resetBill} className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Clear Bill</button>
            <button onClick={createInvoice} disabled={loading} className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}>
              <Receipt className="h-4 w-4" />
              <span>{loading ? 'Creating...' : 'Generate Invoice'}</span>
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`} />
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {filteredProducts.map(product => (<ProductCard key={product._id} product={product} />))}
          </div>
        </div>
        {/* Bill Summary */}
        <div className={`p-6 rounded-xl border h-fit ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Bill</h3>
          {/* Customer Info */}
          <div className="space-y-3 mb-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customer Name *</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className={`w-full px-3 py-2 rounded border text-sm transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Enter customer name" />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
              <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} className={`w-full px-3 py-2 rounded border text-sm transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Phone number" />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} className={`w-full px-3 py-2 rounded border text-sm transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Email address" />
            </div>
          </div>
          {/* Selected Items */}
          <div className="space-y-2 mb-4">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Items ({selectedProducts.size})</h4>
            {selectedProducts.size === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No items added yet</p>
            ) : (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {Array.from(selectedProducts.values()).map(item => (
                  <div key={item.productId} className={`flex justify-between text-sm p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{item.productName}</span><br />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{item.quantity} × ₹{item.unitPrice}</span>
                    </div>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.totalPrice}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Tax and Discount */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tax (₹)</label>
              <input type="number" name="tax" value={formData.tax} onChange={handleInputChange} className={`w-20 px-2 py-1 rounded border text-sm transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-1 focus:ring-blue-500`} min="0" step="0.01" />
            </div>
            <div className="flex justify-between">
              <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Discount (₹)</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} className={`w-20 px-2 py-1 rounded border text-sm transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-1 focus:ring-blue-500`} min="0" step="0.01" />
            </div>
          </div>
          {/* Total */}
          <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex justify-between mb-2">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal:</span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total:</span>
              <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Invoices */}
      <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invoice #</th>
                <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Customer</th>
                <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total</th>
                <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map(invoice => (
                <tr key={invoice._id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <td className={`py-3 font-mono text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{invoice.invoiceNumber}</td>
                  <td className={`py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{invoice.customerName}</td>
                  <td className={`py-3 font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>₹{invoice.total.toFixed(2)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : invoice.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>{invoice.status}</span>
                  </td>
                  <td className={`py-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Invoice Confirmation Modal */}
      <AnimatePresence>
        {showInvoiceForm && currentInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Invoice Preview</h3>
                  <button onClick={() => setShowInvoiceForm(false)} className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}><X className="h-5 w-5" /></button>
                </div>
                {/* Invoice Details */}
                <div className={`border rounded-lg p-6 mb-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Invoice #{currentInvoice.invoiceNumber}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{new Date(currentInvoice.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bill To:</p>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentInvoice.customerName}</p>
                      {currentInvoice.customerPhone && (<p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentInvoice.customerPhone}</p>)}
                    </div>
                  </div>
                  {/* Items */}
                  <div className="mb-4">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <th className={`text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Item</th>
                          <th className={`text-center py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Qty</th>
                          <th className={`text-right py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</th>
                          <th className={`text-right py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentInvoice.items.map((item, index) => (
                          <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                            <td className={`py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.productName}</td>
                            <td className={`py-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.quantity}</td>
                            <td className={`py-2 text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.unitPrice}</td>
                            <td className={`py-2 text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.totalPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Totals */}
                  <div className="text-right space-y-1">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal:</span>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₹{currentInvoice.subtotal.toFixed(2)}</span>
                    </div>
                    {currentInvoice.tax > 0 && (
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tax:</span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₹{currentInvoice.tax.toFixed(2)}</span>
                      </div>
                    )}
                    {currentInvoice.discount > 0 && (
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Discount:</span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>-₹{currentInvoice.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className={`flex justify-between text-lg font-bold pt-2 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Total:</span>
                      <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>₹{currentInvoice.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => confirmInvoice('cash')} className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>Confirm (Cash)</button>
                  <button onClick={() => confirmInvoice('card')} className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>Confirm (Card)</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillingTool;
