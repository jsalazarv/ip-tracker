import { WebsiteLayout } from '@layouts/WebsiteLayout';
import IPTracker from '@modules/Website/IPTracker';

export default [
  {
    path: '/*',
    Component: WebsiteLayout,
    children: [
      { index: true, Component: IPTracker },
      { path: 'ip-tracker', Component: IPTracker },
    ],
  },
];
