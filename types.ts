
export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  LOGS = 'LOGS',
  ACCESS = 'ACCESS',
  POLICY = 'POLICY',
  AI = 'AI'
}

export interface StudentDevice {
  id: string;
  name: string;
  model: string;
  status: 'connected' | 'disconnected' | 'inactive';
  lastActive: string;
}

export interface ActivityLog {
  id: string;
  studentName: string;
  action: string;
  category: '教育学习' | '视频' | '游戏' | '工具';
  time: string;
  risk: '低风险' | '高风险';
  status: '通过指令' | '拦截指令';
}

export interface SecurityPolicy {
  id: string;
  name: string;
  desc: string;
  active: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}
