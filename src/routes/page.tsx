import { useState } from 'react';
import { Button, TextArea, Toast } from '@douyinfe/semi-ui';

import { post as translate } from '@api/translate';
import { useLoading } from '../hooks';

import styles from './page.module.scss';

function IndexPage(): JSX.Element {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const [handleTranslate, loading] = useLoading(async () => {
    const { result } = await translate({
      data: {
        text,
      },
    });

    setResult(result);
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);

    Toast.success('Copied');
  };

  const handleReset = () => {
    setText('');
    setResult('');
  };

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
        <Button
          loading={loading}
          disabled={!text}
          theme="solid"
          onClick={handleTranslate}
        >
          Translate
        </Button>
        <Button disabled={!result} onClick={handleCopy}>
          Copy
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}

export default IndexPage;
