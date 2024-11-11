import React, { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';

interface PlanRow {
  id: string;
  stage: string;
  task: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsible: string;
}

function ConstructionPlan() {
  const [rows, setRows] = useState<PlanRow[]>([
    {
      id: '1',
      stage: '准备阶段',
      task: '场地清理',
      duration: '7天',
      startDate: '2024-03-20',
      endDate: '2024-03-27',
      responsible: '张工'
    }
  ]);

  const addRow = () => {
    const newRow: PlanRow = {
      id: Date.now().toString(),
      stage: '',
      task: '',
      duration: '',
      startDate: '',
      endDate: '',
      responsible: ''
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: keyof PlanRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">施工计划</h2>
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">施工阶段</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">工作内容</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">工期</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">开始日期</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">结束日期</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">负责人</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.stage}
                      onChange={(e) => updateRow(row.id, 'stage', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.task}
                      onChange={(e) => updateRow(row.id, 'task', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.duration}
                      onChange={(e) => updateRow(row.id, 'duration', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={row.startDate}
                      onChange={(e) => updateRow(row.id, 'startDate', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={row.endDate}
                      onChange={(e) => updateRow(row.id, 'endDate', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={row.responsible}
                      onChange={(e) => updateRow(row.id, 'responsible', e.target.value)}
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

export default ConstructionPlan;