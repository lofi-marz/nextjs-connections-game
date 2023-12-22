import type { AriaToastRegionProps, AriaToastProps } from '@react-aria/toast';
import type { ToastState } from '@react-stately/toast';

export type InfoToast = {
    text: string;
};

export interface ToastRegionProps<T> extends AriaToastRegionProps {
    state: ToastState<T>;
}

export interface ToastProps<T> extends AriaToastProps<T> {
    state: ToastState<T>;
}
