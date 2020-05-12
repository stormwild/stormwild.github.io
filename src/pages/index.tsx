import React from 'react';

export default ({ message = 'hi' }: { message: string }) => {
  return <div>Hello world! {message} </div>;
};
