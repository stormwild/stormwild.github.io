import React from 'react';
import 'src/scss/main.scss';

export default ({ message = 'hi' }: { message: string }) => {
  return <div>Hello world! {message} </div>;
};
