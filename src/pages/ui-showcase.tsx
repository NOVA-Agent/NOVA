import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
  Stepper,
  Tabs,
  Toggle,
  Tooltip
} from '../components/ui';

export default function UIShowcase() {
  // 状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [activeStep, setActiveStep] = useState(1);

  // Select组件选项
  const options = [
    { value: 'sol', label: 'Solana' },
    { value: 'eth', label: 'Ethereum' },
    { value: 'btc', label: 'Bitcoin' },
    { value: 'bnb', label: 'Binance Coin', disabled: true }
  ];

  // Tabs组件
  const tabs = [
    { id: 'buttons', label: '按钮', icon: '🔘' },
    { id: 'badges', label: '徽章', icon: '🏷️' },
    { id: 'inputs', label: '输入框', icon: '✏️' },
    { id: 'modals', label: '模态框', icon: '🖼️' },
    { id: 'toggles', label: '开关', icon: '🔄' }
  ];

  // Stepper组件
  const steps = [
    { id: 'step1', label: '选择交易对', description: '选择要交易的通证' },
    { id: 'step2', label: '设置数量', description: '设置交易数量和价格' },
    { id: 'step3', label: '确认交易', description: '确认交易详情', optional: true },
    { id: 'step4', label: '提交交易', description: '提交交易到区块链' }
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">NOVA UI 组件展示</h1>

      <div className="mb-8">
        <Tabs 
          tabs={tabs} 
          defaultTabId="buttons" 
          onChange={(tabId) => setActiveTab(tabId)}
          variant="underline"
        />
      </div>

      {activeTab === 'buttons' && (
        <Card title="按钮组件" className="mb-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">按钮变体</h3>
              <Button variant="primary">主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="danger">危险按钮</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">按钮尺寸</h3>
              <Button size="sm">小按钮</Button>
              <Button size="md">中按钮</Button>
              <Button size="lg">大按钮</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">按钮状态</h3>
              <Button isLoading>加载中</Button>
              <Button disabled>禁用</Button>
              <Button fullWidth>全宽按钮</Button>
              <Button leftIcon={<span>👈</span>}>左图标</Button>
              <Button rightIcon={<span>👉</span>}>右图标</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'badges' && (
        <Card title="徽章组件" className="mb-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">徽章变体</h3>
              <Badge>默认</Badge>
              <Badge variant="primary">主要</Badge>
              <Badge variant="success">成功</Badge>
              <Badge variant="warning">警告</Badge>
              <Badge variant="danger">危险</Badge>
              <Badge variant="info">信息</Badge>
            </div>

            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">轮廓徽章</h3>
              <Badge outline>默认</Badge>
              <Badge variant="primary" outline>主要</Badge>
              <Badge variant="success" outline>成功</Badge>
              <Badge variant="warning" outline>警告</Badge>
              <Badge variant="danger" outline>危险</Badge>
              <Badge variant="info" outline>信息</Badge>
            </div>

            <div className="flex flex-wrap gap-4">
              <h3 className="w-full text-xl font-semibold mb-2">带图标徽章</h3>
              <Badge icon={<span>🚀</span>}>发射</Badge>
              <Badge variant="success" icon={<span>✅</span>}>完成</Badge>
              <Badge variant="warning" icon={<span>⚠️</span>}>警告</Badge>
              <Badge variant="danger" icon={<span>❌</span>}>错误</Badge>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'inputs' && (
        <Card title="输入组件" className="mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="用户名" 
                placeholder="请输入用户名" 
              />
              <Input 
                label="密码" 
                type="password" 
                placeholder="请输入密码" 
              />
              <Input 
                label="错误示例" 
                error={true} 
                helperText="这是一个错误消息" 
                placeholder="错误输入"
              />
              <Input 
                label="帮助文本" 
                helperText="这是一个辅助说明文本" 
                placeholder="带有帮助信息"
              />
              <Input 
                label="禁用输入" 
                disabled
                placeholder="禁用状态" 
              />
              <Input 
                label="全宽输入" 
                fullWidth
                placeholder="100% 宽度" 
              />
              <Input 
                label="带左侧图标" 
                leftIcon={<span>🔍</span>}
                placeholder="搜索..." 
              />
              <Input 
                label="带右侧图标" 
                rightIcon={<span>📅</span>}
                placeholder="选择日期..." 
              />
            </div>

            <div className="mt-4">
              <Select
                label="选择交易对"
                options={options}
                helperText="请选择要交易的通证"
              />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'modals' && (
        <Card title="模态框组件" className="mb-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)}>
                打开模态框
              </Button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="模态框示例"
                footer={
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>
                      确认
                    </Button>
                  </div>
                }
              >
                <p>这是一个模态框示例内容。</p>
                <p className="mt-2">您可以在此处放置任何内容。</p>
              </Modal>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'toggles' && (
        <Card title="开关组件" className="mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Toggle 
                label="基本开关" 
              />
              <Toggle 
                label="预设为开启" 
                defaultChecked
              />
              <Toggle 
                label="带描述的开关" 
                description="这是一段关于此开关的详细说明"
              />
              <Toggle 
                label="禁用状态" 
                disabled
              />
              <Toggle 
                label="小尺寸" 
                size="sm"
              />
              <Toggle 
                label="大尺寸" 
                size="lg"
              />
              <Toggle 
                label="成功色调" 
                color="success"
                defaultChecked
              />
              <Toggle 
                label="危险色调" 
                color="danger"
                defaultChecked
              />
              <Toggle 
                label="左侧文本" 
                labelPosition="left"
              />
            </div>
          </div>
        </Card>
      )}

      <Card title="提示工具组件" className="mb-8">
        <div className="flex flex-wrap gap-8 p-4">
          <Tooltip content="这是一个顶部提示">
            <Button>顶部提示</Button>
          </Tooltip>
          <Tooltip content="这是一个右侧提示" position="right">
            <Button>右侧提示</Button>
          </Tooltip>
          <Tooltip content="这是一个底部提示" position="bottom">
            <Button>底部提示</Button>
          </Tooltip>
          <Tooltip content="这是一个左侧提示" position="left">
            <Button>左侧提示</Button>
          </Tooltip>
          <Tooltip content="信息提示" variant="info">
            <Button>信息提示</Button>
          </Tooltip>
          <Tooltip content="警告提示" variant="warning">
            <Button>警告提示</Button>
          </Tooltip>
          <Tooltip content="错误提示" variant="error">
            <Button>错误提示</Button>
          </Tooltip>
        </div>
      </Card>

      <Card title="步进器组件" className="mb-8">
        <div className="space-y-8">
          <Stepper 
            steps={steps} 
            activeStep={activeStep} 
          />
          
          <div className="flex justify-between">
            <Button 
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              上一步
            </Button>
            <Button 
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
            >
              下一步
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">垂直步进器</h3>
            <Stepper 
              steps={steps} 
              activeStep={activeStep} 
              orientation="vertical"
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 