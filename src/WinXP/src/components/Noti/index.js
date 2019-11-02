import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AppContainer from './Container';

const Chat = () => {
  const routine = () => {
    setTimeout(() => {
      toast('🦄안녕?~~ 난 Effie라고 해~');
    }, 5000);
    setTimeout(() => {
      toast('🦄문래인스턴트에서 살고 있지...');
    }, 10000);
    setTimeout(() => {
      toast('🦄무슨 재밌는 일을 하고 있니?');
    }, 20000);
    setTimeout(() => {
      toast('🦄헐 폭탄 터졌네.. 이런 다시해~');
    }, 24000);
    setTimeout(() => {
      toast('🦄그런데 그게 그렇게 재밌니?');
    }, 27000);
    setTimeout(() => {
      toast('🦄바보~ 뭬~롱');
    }, 28000);
    setTimeout(() => {
      toast('🦄하~~품~~');
    }, 35000);
    setTimeout(() => {
      toast('🦄나 잘래 내일 봐~');
    }, 37000);
  }
  const notify = () => {
    setInterval(routine, 45000);
  };
  useEffect(() => {
    routine();
    notify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppContainer>
      <ToastContainer enableMultiContainer autoClose={5000} />
    </AppContainer>
  );
};

export default Chat;
