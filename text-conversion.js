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
            result += str.charCodeAt(i).toString(10).padStart(5, '0'); 
        }
        return result;
    }

    numberToString(num) {
        let result = '';
        for (let i = 0; i < num.length; i += 5) { 
            let charCode = parseInt(num.substr(i, 5), 10);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
}

Scratch.extensions.register(new TextConverter());
