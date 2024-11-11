import React, { useState } from 'react';
import { Upload, X, FileText, File } from 'lucide-react';

interface DesignDocument {
  id: string;
  name: string;
  size: string;
  type: string;
}

function DesignDocumentPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [documents, setDocuments] = useState<DesignDocument[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      }));
      setDocuments([...documents, ...newFiles]);
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-96' : 'w-48'
    }`}>
      <div 
        className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">设计文档</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? '收起' : '展开'}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4">
          <label className="block mb-4">
            <div className="flex items-center justify-center w-full h-24 px-4 transition bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 cursor-pointer">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-500">
                  点击或拖拽上传设计文档
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.dwg,.rvt"
              />
            </div>
          </label>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <File className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                      {doc.name}
                    </div>
                    <div className="text-xs text-gray-500">{doc.size}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignDocumentPanel;