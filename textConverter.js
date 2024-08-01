class TextConverter {
    getInfo() {
        return {
            id: 'textConverter',
            name: 'テキスト変換',
            color1: '#388df9',
            color2: '#0063ba',
            blocks: [
                {
                    opcode: 'convert',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '変換:[TEXT] を [ACTION]する',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'テキスト'
                        },
                        ACTION: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'actions'
                        }
                    }
                }
            ],
            menus: {
                actions: {
                    acceptReporters: true,
                    items: ['数字化', 'テキスト化']
                }
            }
        };
    }

    convert(args) {
        const action = args.ACTION;
        const text = args.TEXT;

        if (action === '数字化') {
            return this.stringToNumber(text);
        } else if (action === 'テキスト化') {
            return this.numberToString(text);
        }
    }

    stringToNumber(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += str.charCodeAt(i).toString(10).padStart(5, '0'); // 文字のUnicodeコードポイントを取得して5桁の文字列に変換
        }
        return result;
    }

    numberToString(num) {
        let result = '';
        // numがすべて0で構成されている場合、空文字列を返す
        if (/^0+$/.test(num)) {
            return '';
        }
        for (let i = 0; i < num.length; i += 5) { // 各5桁を1つの文字に変換
            let charCode = parseInt(num.substr(i, 5), 10);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
}

Scratch.extensions.register(new TextConverter());
