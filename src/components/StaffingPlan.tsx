import React, { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';

interface StaffRow {
  id: string;
  position: string;
  name: string;
  qualification: string;
  responsibility: string;
  contact: string;
}

function StaffingPlan() {
  const [rows, setRows] = useState<StaffRow[]>([
    {
      id: '1',
      position: '项目经理',
      name: '李明',
      qualification: '高级工程师',
      responsibility: '总体负责',
      contact: '13800138000'
    }
  ]);

  const addRow = () => {
    const newRow: StaffRow = {
      id: Date.now().toString(),
      position: '',
      name: '',
      qualification: '',
      responsibility: '',
      contact: ''
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: keyof StaffRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">施工管理及人员配备</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={addRow}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Plus className="w-4 h-4" />
            <span>添加行</span>
          </button>
          
          <label className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>导入Excel</span>
            <input type="file" className="hidden" accept=".xlsx,.xls" />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">职位</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">姓名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">资质</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">职责</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">联系方式</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.position}
                      onChange={(e) => updateRow(row.id, 'position', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.qualification}
                      onChange={(e) => updateRow(row.id, 'qualification', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.responsibility}
                      onChange={(e) => updateRow(row.id, 'responsibility', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.contact}
                      onChange={(e) => updateRow(row.id, 'contact', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffingPlan;