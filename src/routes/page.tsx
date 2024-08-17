import { useState } from 'react';
import { Button, TextArea } from '@douyinfe/semi-ui';

import styles from './page.module.scss';

function IndexPage(): JSX.Element {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.title}>English</div>
      <TextArea
        value={text}
        rows={8}
        placeholder="Please enter"
        onChange={setText}
      />
      <div className={styles.title}>Hackerese</div>
      <TextArea
        value={result}
        rows={8}
        readonly
        placeholder="Result"
        onChange={setResult}
      />
      <div className={styles.footer}>
        <Button theme="solid">Translate</Button>
        <Button>Copy</Button>
        <Button>Reset</Button>
      </div>
    </div>
  );
}

export default IndexPage;
