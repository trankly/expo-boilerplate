import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Redirect, Slot } from 'expo-router';
import { useAuthStore } from '~/store/auth';

import { HeaderButton } from '../../components/HeaderButton';
import { Button } from '~/components/Button';

const DrawerLayout = () => {
  const session = useAuthStore((s) => s.session);
  const didRestore = useAuthStore((s) => s.didRestore);

  if (!didRestore) return null;

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
