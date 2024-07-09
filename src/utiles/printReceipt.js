/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { BluetoothEscposPrinter, ALIGN } from 'tp-react-native-bluetooth-printer';

// Helper function to pad strings
const padRight = (str, length) => str.length >= length ? str : str + ' '.repeat(length - str.length);
const padLeft = (str, length) => str.length >= length ? str : ' '.repeat(length - str.length) + str;

const printReceipt = async (receiptData) => {
    const { 
        businessName, 
        addressLine1, 
        addressLine2, 
        phone, 
        table, 
        checkNumber, 
        pax, 
        date, 
        time, 
        cashier, 
        items, 
        subtotal, 
        foodTax, 
        localTax, 
        total, 
        footerMessage 
    } = receiptData;

    try {
        await BluetoothEscposPrinter.printerInit();

        // Print Business Header
        await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(`${businessName}\n`, { fonttype: 3 });
        await BluetoothEscposPrinter.printText(`${addressLine1}\n`, {});
        await BluetoothEscposPrinter.printText(`${addressLine2}\n`, {});
        await BluetoothEscposPrinter.printText(`TEL : ${phone}\n\n`, {});

        // Print Table and Check Info
        await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT);
        await BluetoothEscposPrinter.printText(`Table - ${table}\n`, { fonttype: 3 });
        await BluetoothEscposPrinter.printText(`Check #: ${checkNumber}  Pax(s): ${pax}\n`, {});
        await BluetoothEscposPrinter.printText(`Date : ${date}  ${time}\n`, {});
        await BluetoothEscposPrinter.printText(`Cashier: ${cashier}\n\n`, {});

        // Print Items
        await BluetoothEscposPrinter.printText("--------------------------------\n", {});
        for (const item of items) {
            const itemLine = `${padRight(`${item.quantity} ${item.name}`, 24)}${padLeft(item.total.toFixed(2), 8)}\n`;
            await BluetoothEscposPrinter.printText(itemLine, {});
        }
        await BluetoothEscposPrinter.printText("--------------------------------\n", {});

        // Print Totals
        const printTotalLine = async (label, amount) => {
            const totalLine = `${padRight(label, 24)}${padLeft(amount.toFixed(2), 8)}\n`;
            await BluetoothEscposPrinter.printText(totalLine, {});
        };

        await printTotalLine('Subtotal :', subtotal);
        await printTotalLine('Food Tax :', foodTax);
        await printTotalLine('Local Tax :', localTax);
        await BluetoothEscposPrinter.printText(`${padRight('Total :', 24)}${padLeft(total.toFixed(2), 8)}\n`, { fonttype: 3 });

        // Print Footer
        await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
        await BluetoothEscposPrinter.printText(`${footerMessage}\n`, {});

        await BluetoothEscposPrinter.printText("\n\n\n", {}); // Add some space at the end of the receipt

        // Cut the paper
        await BluetoothEscposPrinter.cutLine(1);

    } catch (error) {
        console.error(error);
    }
};

export default printReceipt;
