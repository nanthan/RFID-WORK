package RFID;

import jssc.SerialPort;
import jssc.SerialPortException;


public class Main implements Runnable {

	public static void main(String[] args) {
		
		new Panel();
		
		//(new Thread(new App())).start();
	}
	
	public void run() {
        System.out.println("Hello from a thread!");
		SerialPort serialPort = new SerialPort("COM7");
		while (true) {
			try {
				serialPort.openPort();// Open serial port
				serialPort.setParams(9600, 8, 1, 0);// Set params.
				
					byte[] buffer = serialPort.readBytes(16);// Read 10 bytes from
																// serial port
					String s = new String(buffer);
					s = s.substring(1,12);
					System.out.println(s);
					serialPort.closePort();// Close serial port
			}
	
				// System.out.println(serialPort.getInputBufferBytesCount());
			catch (SerialPortException ex) {
				System.out.println(ex);
			}
		}
    }
	
}
