import React, { useState } from 'react';
import { FileText, Database, Settings, History, Download } from 'lucide-react';
import ProposalEditor from './components/ProposalEditor';
import DocumentUpload from './components/DocumentUpload';
import ModelSettings from './components/ModelSettings';
import Sidebar from './components/Sidebar';
import ProposalHistory from './components/ProposalHistory';
import ConstructionPlan from './components/ConstructionPlan';
import StaffingPlan from './components/StaffingPlan';
import KnowledgeSidebar from './components/KnowledgeSidebar';
import DesignDocumentPanel from './components/DesignDocumentPanel';

function App() {
  const [activeView, setActiveView] = useState('editor');
  const [activeSection, setActiveSection] = useState('overview');
  const [documents, setDocuments] = useState<File[]>([]);
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    prompt: '',
    apiEndpoint: '',
    apiKey: '',
    modelVersion: 'gpt-4'
  });

  const knowledgeFragments = [
    {
      id: '1',
      content: '根据《建筑工程施工质量验收统一标准》GB50300-2013规定，混凝土强度等级应符合设计要求，其强度标准值应通过试块试验确定。',
      confidence: 0.95,
      source: '建筑规范.pdf'
    },
    {
      id: '2',
      content: '施工现场应设置临时围挡，围挡高度不应低于1.8米，并应做到坚固、稳定、整洁、美观。',
      confidence: 0.88,
      source: '安全施工指南.doc'
    },
    {
      id: '3',
      content: '深基坑支护结构应进行验算，确保基坑周边建筑物和地下管线的安全。',
      confidence: 0.82,
      source: '地基工程手册.pdf'
    }
  ];

  const mainViews = [
    { id: 'editor', label: '方案生成', icon: FileText },
    { id: 'knowledge', label: '知识库', icon: Database },
    { id: 'settings', label: '配置参数', icon: Settings },
    { id: 'history', label: '历史记录', icon: History },
    { id: 'export', label: '导出方案', icon: Download },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'editor':
        return (
          <div className="space-y-6">
            <ProposalEditor 
              section={activeSection}
              onSectionChange={setActiveSection}
              modelSettings={modelSettings}
            />
            {activeSection === 'plan' && <ConstructionPlan />}
            {activeSection === 'staffing' && <StaffingPlan />}
          </div>
        );
      case 'knowledge':
        return (
          <DocumentUpload 
            documents={documents}
            onDocumentsChange={setDocuments}
          />
        );
      case 'settings':
        return (
          <ModelSettings
            settings={modelSettings}
            onSettingsChange={setModelSettings}
          />
        );
      case 'history':
        return <ProposalHistory />;
      case 'export':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">导出方案</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">导出完整施工方案文档</span>
                <button
                  onClick={() => {
                    alert('导出功能即将上线');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  导出 Word
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        mainViews={mainViews}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <main className="flex flex-1">
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">智能施工方案编辑系统</h1>
              <p className="mt-2 text-gray-600">基于AI大模型的智能施工方案生成与编辑平台</p>
            </header>

            <div className="w-full">
              {renderContent()}
            </div>
          </div>
        </div>
        
        {activeView === 'editor' && (
          <>
            <KnowledgeSidebar fragments={knowledgeFragments} />
            <DesignDocumentPanel />
          </>
        )}
      </main>
    </div>
  );
}

export default App;