# Dev Notes


```js
{
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', 'react', {
                            modules: false
                        }]
                    ]
                }
            }]
        }
```

## Links

https://www.clock.co.uk/insight/deleting-a-git-commit
https://jonhilton.net/2016/09/07/using-asp-net-core-against-net-4-6/
https://jonhilton.net/2017/03/14/use-asp-net-core-1-1-with-net-4-without-visual-studio/
