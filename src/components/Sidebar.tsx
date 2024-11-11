import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarProps {
  mainViews: {
    id: string;
    label: string;
    icon: LucideIcon;
  }[];
  activeView: string;
  onViewChange: (view: string) => void;
}

function Sidebar({ mainViews, activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-xl font-semibold text-gray-900">方案编辑器</span>
      </div>
      
      <nav className="space-y-1">
        {mainViews.map((view) => {
          const Icon = view.icon;
          const isActive = activeView === view.id;
          return (
            <button
              key={view.id}
              onClick={() => onViewChange(view.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{view.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;