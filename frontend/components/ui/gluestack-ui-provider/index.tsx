import React, { useState, useEffect } from 'react';
import { config } from './config';
import { View, ViewProps, useColorScheme as useRNColorScheme } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const systemColorScheme = useRNColorScheme();
  const resolvedMode: 'light' | 'dark' =
    mode === 'system'
      ? (systemColorScheme ?? 'light')
      : mode;

  return (
    <View
      style={[
        config[resolvedMode],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
