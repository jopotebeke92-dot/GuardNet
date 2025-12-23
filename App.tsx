
import React, { useState, useEffect } from 'react';
import { AppTab, StudentDevice, SecurityPolicy, ActivityLog } from './types';
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
];

const INITIAL_POLICIES: SecurityPolicy[] = [
  { id: 'p1', name: '有害成人内容', desc: '自动识别并拦截此类网络活动', active: true },
  { id: 'p2', name: '网络赌博屏蔽', desc: '自动识别并拦截此类网络活动', active: true },
  { id: 'p3', name: '暴力恐怖信息', desc: '自动识别并拦截此类网络活动', active: true },
  { id: 'p4', name: '不良诱惑过滤', desc: '自动识别并拦截此类网络活动', active: true },
  { id: 'p5', name: '课间社交限制', desc: '限制微信、QQ等社交应用', active: false },
  { id: 'p6', name: '休闲游戏锁定', desc: '屏蔽主流手机游戏域名', active: true },
];

const INITIAL_LOGS: ActivityLog[] = [
  { id: 'l1', studentName: '李强', action: '维基百科', category: '教育学习', time: '14:20', risk: '低风险', status: '通过指令' },
];

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [devices, setDevices] = useState<StudentDevice[]>(INITIAL_DEVICES);
  const [policies, setPolicies] = useState<SecurityPolicy[]>(INITIAL_POLICIES);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  // 添加日志的通用函数
  const addLog = (log: Omit<ActivityLog, 'id' | 'time'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: `l${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        const newStatus = d.status === 'connected' ? 'disconnected' : 'connected';
        addLog({
          studentName: d.name,
          action: newStatus === 'connected' ? '恢复连网' : '手动切断网络',
          category: '工具',
          risk: '低风险',
          status: '通过指令'
        });
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const setAllStatus = (status: 'connected' | 'disconnected') => {
    setDevices(prev => prev.map(d => ({ ...d, status })));
    addLog({
      studentName: '全班',
      action: status === 'connected' ? '一键恢复全班网络' : '一键切断全班网络',
      category: '工具',
      risk: '低风险',
      status: '通过指令'
    });
  };

  const togglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => {
      if (p.id === id) {
        const nextActive = !p.active;
        addLog({
          studentName: '管理员',
          action: `${nextActive ? '开启' : '关闭'}策略: ${p.name}`,
          category: '工具',
          risk: '低风险',
          status: '通过指令'
        });
        return { ...p, active: nextActive };
      }
      return p;
    }));
  };

  const addSimulatedStudent = () => {
    const names = ['赵敏', '周芷若', '张无忌', '小昭'];
    const models = ['IPAD PRO', 'SAMSUNG S24', 'VIVO X100'];
    const newStudent: StudentDevice = {
      id: Date.now().toString(),
      name: names[Math.floor(Math.random() * names.length)],
      model: models[Math.floor(Math.random() * models.length)],
      status: 'connected',
      lastActive: '现在'
    };
    setDevices(prev => [...prev, newStudent]);
    addLog({
      studentName: newStudent.name,
      action: '通过配对码新接入设备',
      category: '工具',
      risk: '低风险',
      status: '通过指令'
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      <header className="bg-white px-6 pt-12 pb-4 flex justify-between items-center border-b border-slate-100 shadow-sm z-20">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">BN</div>
          <h1 className="text-xl font-bold text-slate-800">班级管理助手</h1>
        </div>
        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
          {devices.filter(d => d.status === 'connected').length} 在线
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {currentTab === AppTab.DASHBOARD && (
          <DashboardView 
            devices={devices} 
            onToggle={toggleDevice} 
            onSetAll={setAllStatus} 
            activePoliciesCount={policies.filter(p => p.active).length}
          />
        )}
        {currentTab === AppTab.LOGS && <LogsView logs={logs} />}
        {currentTab === AppTab.ACCESS && <AccessView onSimulate={addSimulatedStudent} />}
        {currentTab === AppTab.POLICY && <PolicyView policies={policies} onToggle={togglePolicy} />}
        {currentTab === AppTab.AI && <AIView devices={devices} />}
      </main>

      <TabBar currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
};

export default App;
