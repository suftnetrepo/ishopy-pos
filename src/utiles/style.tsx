/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/display-name */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable prettier/prettier */
// import React, { forwardRef } from "react";

// // @ts-ignore
// const styled = (Component, { base, variants } = {}) => {
//     return forwardRef((props, ref) => {
//         const styles = { ...(base || {}) };
//         const options = props;

//         Object.keys(variants || {}).forEach((category) => {
//             // @ts-ignore
//             const variantSelected = options[category];
//             const variantValue = variants[category];

//             if (typeof variantValue === "function") {
//                 const style = variantValue(variantSelected, options);
//                 if (style) {
//                     Object.assign(styles, style);
//                 }
//             } else if (variantValue && variantValue[variantSelected]) {
//                 const value = variantValue[variantSelected];
//                 Object.assign(
//                     styles,
//                     typeof value === "function" ? value(options) : value
//                 );
//             }
//         });

//         return <Component {...props} style={styles} ref={ref} />;
//     });
// };

// export { styled }
