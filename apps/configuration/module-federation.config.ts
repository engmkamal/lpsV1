import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'configuration',
  exposes: {
    './Module': 'apps/configuration/src/app/remote-entry/entry.module.ts',
  },
};

export default config;
