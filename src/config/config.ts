import { QuaggaJSConfigObject } from "../../type-definitions/quagga";
import DevConfig from './config.dev';
import NodeConfig from './config.node';
import ProdConfig from './config.prod';

// @ts-ignore // TODO: this produces a bizarre typescript error
const QuaggaConfig: QuaggaJSConfigObject = ENV.development
    ? DevConfig
    : ENV.node
        ? NodeConfig
        : ProdConfig;

export default QuaggaConfig;
