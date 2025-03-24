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
  Tooltip,
  Switch
} from '../components/ui';

export default function UIShowcase() {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [currentStep, setCurrentStep] = useState(0);

  // Select Component Options
  const options = [
    { value: 'sol', label: 'Solana' },
    { value: 'eth', label: 'Ethereum' },
    { value: 'btc', label: 'Bitcoin' },
    { value: 'bnb', label: 'Binance Coin', disabled: true }
  ];

  // Tabs Component
  const tabs = [
    { id: 'buttons', label: 'Buttons', icon: '🔘' },
    { id: 'badges', label: 'Badges', icon: '🏷️' },
    { id: 'inputs', label: 'Inputs', icon: '✏️' },
    { id: 'modals', label: 'Modals', icon: '🖼️' },
    { id: 'toggles', label: 'Toggles', icon: '🔄' }
  ];

  // Stepper Component
  const steps = [
    { id: 'step1', label: 'Select Pair', description: 'Choose trading pair' },
    { id: 'step2', label: 'Set Amount', description: 'Set trading amount and price' },
    { id: 'step3', label: 'Confirm', description: 'Confirm transaction details', optional: true },
    { id: 'step4', label: 'Submit', description: 'Submit transaction to blockchain' }
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">NOVA UI Component Showcase</h1>

      <div className="mb-8">
        <Tabs 
          tabs={tabs} 
          defaultTabId="buttons" 
          onChange={(tabId) => setActiveTab(tabId)}
          variant="underline"
        />
      </div>

      {activeTab === 'buttons' && (
        <Card title="Button Components" className="mb-8">
          <div className="space-y-6">
            <h3 className="w-full text-xl font-semibold mb-2">Button Variants</h3>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </Card>
      )}

      {activeTab === 'badges' && (
        <Card title="Badge Components" className="mb-8">
          <div className="space-y-8">
            <div>
              <h3 className="w-full text-xl font-semibold mb-2">Badge Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div>
              <h3 className="w-full text-xl font-semibold mb-2">Outline Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge outline>Default</Badge>
                <Badge variant="primary" outline>Primary</Badge>
                <Badge variant="success" outline>Success</Badge>
                <Badge variant="warning" outline>Warning</Badge>
                <Badge variant="danger" outline>Danger</Badge>
                <Badge variant="info" outline>Info</Badge>
              </div>
            </div>

            <div>
              <h3 className="w-full text-xl font-semibold mb-2">Badges with Icons</h3>
              <div className="flex flex-wrap gap-2">
                <Badge icon={<span>🚀</span>}>Launch</Badge>
                <Badge variant="success" icon={<span>✅</span>}>Complete</Badge>
                <Badge variant="warning" icon={<span>⚠️</span>}>Warning</Badge>
                <Badge variant="danger" icon={<span>❌</span>}>Error</Badge>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'inputs' && (
        <Card title="Input Components" className="mb-8">
          <div className="space-y-6">
            <Input
              label="Username"
              placeholder="Enter username"
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
            />
            <Input
              label="Error Example"
              error
              helperText="This is an error message"
              placeholder="Invalid input"
            />
            <Input
              label="Help Text"
              helperText="This is a helper text"
              placeholder="With helper text"
            />
          </div>
        </Card>
      )}

      {activeTab === 'modals' && (
        <Card title="Modal Components" className="mb-8">
          <div className="space-y-4">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Modal Example"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <p>This is an example modal content.</p>
                  <p className="mt-2">You can place any content here.</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </Card>
      )}

      {activeTab === 'toggles' && (
        <Card title="Switch Components" className="mb-8">
          <div className="space-y-4">
            <Switch
              label="Basic Switch"
            />
            <Switch
              label="Default On"
              defaultChecked
            />
            <Switch
              label="With Description"
              description="This is a detailed description about this switch"
            />
            <Switch
              label="Disabled State"
              disabled
            />
            <Switch
              label="Small Size"
              size="sm"
            />
            <Switch
              label="Large Size"
              size="lg"
            />
            <Switch
              label="Success Style"
              variant="success"
            />
            <Switch
              label="Danger Style"
              variant="danger"
            />
            <Switch
              label="Left Label"
              labelPosition="left"
            />
          </div>
        </Card>
      )}

      <Card title="Tooltip Components" className="mb-8">
        <div className="flex flex-wrap gap-8 p-4">
          <Tooltip content="This is a top tooltip">
            <Button>Top Tooltip</Button>
          </Tooltip>
          <Tooltip content="This is a right tooltip" position="right">
            <Button>Right Tooltip</Button>
          </Tooltip>
          <Tooltip content="This is a bottom tooltip" position="bottom">
            <Button>Bottom Tooltip</Button>
          </Tooltip>
          <Tooltip content="This is a left tooltip" position="left">
            <Button>Left Tooltip</Button>
          </Tooltip>
          <Tooltip content="Info tooltip" variant="info">
            <Button>Info Tooltip</Button>
          </Tooltip>
          <Tooltip content="Warning tooltip" variant="warning">
            <Button>Warning Tooltip</Button>
          </Tooltip>
          <Tooltip content="Error tooltip" variant="error">
            <Button>Error Tooltip</Button>
          </Tooltip>
        </div>
      </Card>

      <Card title="Stepper Components" className="mb-8">
        <div className="space-y-8">
          <div>
            <Stepper
              steps={steps}
              activeStep={currentStep}
              onStepClick={setCurrentStep}
            />
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Vertical Stepper</h3>
            <Stepper
              steps={steps}
              activeStep={currentStep}
              onStepClick={setCurrentStep}
              orientation="vertical"
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 