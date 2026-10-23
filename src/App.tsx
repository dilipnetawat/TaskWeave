import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WorkflowProvider } from './context/WorkflowContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewWorkflowPage } from './pages/NewWorkflowPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { ToolsPage } from './pages/ToolsPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ErrorBoundary>
      <WorkflowProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* App Workspace Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="new" element={<NewWorkflowPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </WorkflowProvider>
    </ErrorBoundary>
  );
}

export default App;
