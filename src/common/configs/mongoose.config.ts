import { registerAs } from '@nestjs/config';
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { ConfigName } from '../enums/configName.enum';
import { configEnv } from './configEnv.config';

export default registerAs<MongooseModuleFactoryOptions>(
  ConfigName.MongooseConfig,
  () => {
    const { mongoDBConnecter } = configEnv();

    return {
      uri: mongoDBConnecter,
    };
  },
);
