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