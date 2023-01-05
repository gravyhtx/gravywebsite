import { NextPage } from "next";
import copyToClipboard from "../helpers/copyToClipboard";
import { shuffleStr, select } from "../utils/generator";

const SuperPasswordGenerator: NextPage = (): JSX.Element => {
  const title = "Super Password Generator v2.0";

  const char = {
    abc: 'abcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    sym: `\`'"%!@#$^&*()_+-=[]{};:'\\|,.<>?/~`,
  }

  const checks = {
    lc: /[a-z]/,
    uc: /[A-Z]/,
    nm: /[0-9]/,
    sm: /[`'"!@#$%^&*()_+-=\[\]{};:\\|,.<>?\/~]/
  }

  const checkString = (check: RegExp, string: string): boolean => check.test(string);

  console.log(checkString(checks.uc, 'P@$5w0r[)'))
  

  let charSel = '';

  let opts = {
    lc: false,
    uc: false,
    nm: false,
    sm: false,
  }

  if(opts.lc)
    charSel += char.abc;
  if(opts.uc)
    charSel += char.abc.toUpperCase();
  if(opts.nm)
    charSel += char.num;
  if(opts.sm)
    charSel += char.sym;

  const leetAlphabet = {
    a: { abc: '@ 4',
         leet: '4 /\\ /-\\',
         xt: 'ª å ä ã â á à æ À Á Ã Ä Å Æ' },
    b: { abc: '8',
         leet: '8 13',
         xt: 'ß Þ' },
    c: { abc: '( [',
         leet: '( <',
         xt: '¢ © ç Ç' },
    d: { abc: ')',
         leet: '[) ) </',
         xt: '' },
    e: { abc: '3',
         leet: '3',
         xt: '€ ≡ £ ê ë é è È É Ë Ê' },
    f: { abc: '',
         leet: '|=',
         xt: '' },
    g: { abc: '6',
         leet: '6',
         xt: '' },
    h: { abc: '#',
         leet: '|-| ]-[',
         xt: '' },
    i: { abc: '!',
         leet: '|',
         xt: '¡ ï î í ì Ì Í Î Ï' },
    j: { abc: '',
         leet: '.]',
         xt: '' },
    k: { abc: '',
         leet: '|<',
         xt: '' },
    l: { abc: '1',
         leet: '1',
         xt: '£' },
    m: { abc: '',
         leet: '|Y|',
         xt: 'µ' },
    n: { abc: '',
         leet: '/\\/ |\\|',
         xt: 'ñ' },
    o: { abc: '0',
         leet: '0 () []',
         xt: '° º ö õ ô ó ò ð ø Ò Ó Ö Ö Õ Ô Ø' },
    p: { abc: '?',
         leet: '|> ?',
         xt: '' },
    q: { abc: '&',
         leet: '0, &',
         xt: '' },
    r: { abc: '',
         leet: '|2',
         xt: '®' },
    s: { abc: '$ 5',
         leet: '5 $',
         xt: '§', },
    t: { abc: '+ 7',
         leet: '7',
         xt: '†' },
    u: { abc: '',
         leet: '[_] |_|',
         xt: 'µ ü û ú ù Ü Ú Ù Û' },
    v: { abc: '\\/',
         leet: '\\/',
         xt: '' },
    w: { abc: '\\/\\/ \\v/ \\^/',
         leet: '',
         xt: '' },
    x: { abc: '* ><',
         leet: '}{ ',
         xt: '¤' },
    y: { abc: '',
         leet: '`/',
         xt: 'Ÿ Ý ¥' },
    z: { abc: '',
         leet: '2',
         xt: 'ž Ž' },
    oe: { xt: 'œ Œ' },
    cc: { xt: '«' },
  }

  // RULES
  //  * All characters must be ASCII and can be easily created (Mac: Option + character creates the complicated ones).
  //  * If 2 characters are the same, will select the one that has a lower position in the array's length UNLESS
  //    there is only no other option one character.
  //      >> Characters are prioritized so that, for example, when the letters 'h' and 'a' are used, in
  //      >> which both have the character '4' as a replacement, the original character that is closest
  //      >> to the replacement character will ge† the charac†er
  // 
  // OPERATIONS
  //  *
  //  * Check for and replace the double characters first ('oe', 'cc', etc.)

  const randomCharSelect = (set: string) => {
    const shuffledSet = shuffleStr(set); // Keepsin' it reeeal random
    return select(shuffledSet);
  }

  // Copy to clipboard function. Add Ref from text area (input) to function
  // copyToClipboard(ref)

  return (<>
    {/* <DefaultLayout title={title}> */}
    {/* </DefaultLayout> */}
  </>)

}

export default SuperPasswordGenerator;