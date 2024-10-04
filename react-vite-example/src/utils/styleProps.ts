
function createClassName({ format, ...values }: Record<string, string>) {
 return format.replace(/\$\{(.*?)}/g, (match, slotName) => {
   const trimmedSlotName = slotName.trim();
   return values[trimmedSlotName] || match;
 });
}


function toKebabCase(str: string): string {
 return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}


export function getClassNames<StyleProps extends Record<string, unknown>>({
 props,
 styles,
}: {
 props: StyleProps;
 styles: Record<string, string>;
}) {
 return Object.keys(props)
   .map((propName) => {
     const propValue = props[propName];


     switch (typeof propValue) {
       case "string":
         return createClassName({
           format: '.${propName}--${propValue}',
           propName: toKebabCase(propName),
           propValue,
         });
       case "boolean": {
         return createClassName({
           format: propValue
             ? '.${propName}'
             : ':not(.${propName})',
           propName: toKebabCase(propName),
         });
       }
       default:
         return undefined;
     }
   })
   .reduce((accum: string[], value) => {
     if (value && value?.[0] === ".") accum.push(styles[value.slice(1)]);
     return accum;
   }, []);
}