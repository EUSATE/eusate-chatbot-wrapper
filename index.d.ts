import { EusateMessengerSDK } from './utils';
declare global {
    interface Window {
        Eusate: EusateMessengerSDK;
    }
}
declare const Eusate: EusateMessengerSDK;
export default Eusate;
