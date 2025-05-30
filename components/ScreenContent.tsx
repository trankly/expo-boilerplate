import { H2, Separator, Theme, YStack } from 'tamagui';

import { EditScreenInfo } from './EditScreenInfo';
import { Button } from '~/components/Button';
import { useAuthStore } from '~/store/auth';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const signOut = useAuthStore((s) => s.signOut);
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>{title}</H2>
        <Separator />
        <EditScreenInfo path={path} />
        {children}
        <Button title={'Sign Out'} onPress={signOut} />
      </YStack>
    </Theme>
  );
};
