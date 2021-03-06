(function () {

    //////////////////////////////
    // 定義

    // define stats
    var stats = { // Set to refer to the local folder
        "tmp": { // Reference /tmp directory
            "path": "/tmp",
            "from": null
        }
    };

    //////////////////////////////
    // ENVファイルの設定テンプレート
    var template = {
        "app": { // Beez Foundation Server configure
            "stat": { // Static Server configure
                "compress": true, // gzip
                "port": 1109, // listen port
                "header": { // Add response header
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "include": { // Setting in the configuration file of a different environment
                    "path": "./local",
                    "from": null
                }
            },
            "mock": { // Mock Server configure
                "use": true, // use mock?
                "compress": true, // gzip
                "port": 1121, // listen port
                "header": { // Add response header
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                },
                "include": { // Mock data folder setting
                    "path": "./mockdata",
                    "from": null
                }
            },
            "operation": [
                { "target": "build", "comment": "grunt build" },
                { "target": "deploy", "comment": "grunt deploy" },
                { "target": "default", "comment": "grunt default" },
                { "target": "jshint", "comment": "grunt jshint" },
                { "target": "clean", "comment": "grunt clean" },
                { "target": "docs", "comment": "grunt docs" }
            ]
        },
        "stats": stats,
        "bootstrap": {
            "html": [ "*/index/index.html.hbs" ], // "[env][key].html" files match the pattern
            "datamain": [ "*/index/require.beez.js.hbs", "*/tutorial/require.beez.js.hbs" ] // "beez.require.[env][key].js" files match the pattern
        },
        "stylus": { // Stylus configure
            "options": { // @see http://learnboost.github.io/stylus/docs/executable.html
                "encode": "utf-8",
                "compress": true,
                "firebug": false,
                "linenos": false,
                "nib": true, // stylus nib on/of
                "url": {}, // @see http://learnboost.github.io/stylus/docs/functions.url.html
                "fn": {} // variable that can be used with stylus file
            }
        },
        "image": { // Image convert configure
            "options": {
                "baseRatio": 2, // base ratio
                "ratios": [ 1, 1.5, 2, 3 ], // generate ratio
                "extnames": [ ".png" ], // extension to be converted
                "include": [], // directory or file you want to resize
                "exclude": [], // directory or file you want not to resize
                "separator": "-" // separator to be used in a output file name
            }
        }, // Sprite sheet configure
        "sprite": {
            "options": {
                "ratios": [ 1, 1.3, 1.5, 2 ], // generate ratio
                "extnames": [ ".png", ".jpg" ], // extension to convert
                "heads": [ "sprite", "_sprite" ], // prefix of filename to convert
                "separator": "-", // separator to be used in a output file name
                "overwrite": true // overwrite spritesheet or not
                // "logpath": "/project/temp", // place of stat log
                // "logname": ".sprite" // name of stat log
            }
        },
        "deploy": {
            "optipng": true,
            "jpegoptim": true,
            "include": [ "dist/*/index.js", "dist/index/require.beez.*.js", "*.html", "*.css", "*.png", "*.jpg", "*.gif", "*.ttf", "*.eot", "*.woff" ], // files you want to deploy
            "exclude": [ "_*.css", "_*.png", "_*.jpg", "_*.gif", "_*.ttf", "_*.eot", "_*.woff" ] // files you want not to deploy
        },
        "ignore": {
            "include": [], // files to be included in the product
            "exclude": [] // exclude files from the product
        }
    };

    //////////////////////////////
    // ENV単位に、上書きするデータセット
    var environment = {
        // ローカル環境
        local: {
            "app": {
                "stat": {
                    "include": {
                        "path": "./local"
                    }
                }
            }
        },
        // 本番環境
        prd: {
            "app": {
                "stat": {
                    "include": {
                        "path": "./prd"
                    }
                },
                "mock": {
                    "use": false
                }
            }
        }

    };

    return { template: template, environment: environment };
}())
