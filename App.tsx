
import React, { useState } from 'react';
import { AppTab, StudentDevice } from './types';
import DashboardView from './components/DashboardView';
import LogsView from './components/LogsView';
import AccessView from './components/AccessView';
import PolicyView from './components/PolicyView';
import AIView from './components/AIView';
import TabBar from './components/TabBar';

const INITIAL_DEVICES: StudentDevice[] = [
  { id: '1', name: '张伟', model: 'IPHONE 15', status: 'connected', lastActive: '现在' },
  { id: '2', name: '王芳', model: 'HUAWEI P60', status: 'connected', lastActive: '现在' },
  { id: '3', name: '李强', model: 'XIAOMI 14', status: 'inactive', lastActive: '10分钟前' },
  { id: '4', name: '赵敏', model: 'IPAD AIR', status: 'connected', lastActive: '现在' },
];

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [devices, setDevices] = useState<StudentDevice[]>(INITIAL_DEVICES);

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, status: d.status === 'connected' ? 'disconnected' : 'connected' };
      }
      return d;
    }));
  };

  const setAllStatus = (status: 'connected' | 'disconnected') => {
    setDevices(prev => prev.map(d => ({ ...d, status })));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      <header className="bg-white px-6 pt-12 pb-4 flex justify-between items-center border-b border-slate-100 shadow-sm z-20">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">BN</div>
          <h1 className="text-xl font-bold text-slate-800">班级管理助手</h1>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 text-slate-400 hover:text-blue-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
          <button className="p-2 text-slate-400 hover:text-blue-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31--2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {currentTab === AppTab.DASHBOARD && <DashboardView devices={devices} onToggle={toggleDevice} onSetAll={setAllStatus} />}
        {currentTab === AppTab.LOGS && <LogsView />}
        {currentTab === AppTab.ACCESS && <AccessView />}
        {currentTab === AppTab.POLICY && <PolicyView />}
        {currentTab === AppTab.AI && <AIView devices={devices} />}
      </main>

      <TabBar currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
};

export default App;
