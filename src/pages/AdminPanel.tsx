import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Copy, Trophy, X } from 'lucide-react';
import QRCode from 'react-qr-code';

const AdminPanel = () => {
  const [qrCodes, setQrCodes] = useState<Array<{ id: string; type: 'winner' | 'loser'; url: string }>>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQR, setSelectedQR] = useState<{ type: 'winner' | 'loser'; url: string } | null>(null);

  const generateQRCode = (type: 'winner' | 'loser') => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${type}`;
    const id = Date.now().toString();
    
    setQrCodes([...qrCodes, { id, type, url }]);
    setSelectedQR({ type, url });
    setShowQRModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = (url: string, type: string) => {
    const svg = document.getElementById(`qr-${type}`);
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `jordivo-${type}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate QR codes for your clothing tags and track engagement
          </p>
        </motion.div>

        {/* QR Code Generation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Winner QR Code</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Generate QR codes that lead to the winner page for lucky customers
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => generateQRCode('winner')}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg transition-all"
            >
              Generate Winner QR Code
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Loser QR Code</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Generate QR codes that lead to the "better luck next time" page
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => generateQRCode('loser')}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white font-semibold text-lg hover:shadow-lg transition-all"
            >
              Generate Loser QR Code
            </motion.button>
          </motion.div>
        </div>

        {/* Generated QR Codes List */}
        {qrCodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Generated QR Codes</h3>
            <div className="grid gap-4">
              {qrCodes.map((qr, index) => (
                <div key={qr.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      qr.type === 'winner' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold capitalize">{qr.type} QR Code</p>
                      <p className="text-gray-400 text-sm">{qr.url}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(qr.url)}
                      className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedQR(qr);
                        setShowQRModal(true);
                      }}
                      className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <QrCode className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* QR Code Modal */}
        {showQRModal && selectedQR && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white capitalize">
                  {selectedQR.type} QR Code
                </h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg mb-6">
                <QRCode
                  id={`qr-${selectedQR.type}`}
                  value={selectedQR.url}
                  size={200}
                  className="mx-auto"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => copyToClipboard(selectedQR.url)}
                  className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => downloadQR(selectedQR.url, selectedQR.type)}
                  className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;