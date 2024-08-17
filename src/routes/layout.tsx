import { Outlet } from '@modern-js/runtime/router';

import styles from './layout.module.scss';
import '../global.css';

function Layout(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Hackerese</div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
