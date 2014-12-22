package RFID;

 
 
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;


public class LayoutSample extends JFrame {


    public LayoutSample() {

        initUI();
    }

    public final void initUI() {

        setLayout(null);

        JButton ok = new JButton("OK");
        ok.setBounds(50, 50, 80, 25);

        JButton close = new JButton("Close");
        close.setBounds(150, 50, 80, 25);

        add(ok);
        add(close);

        setTitle("Absolute positioning");
        setSize(300, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {
        
        SwingUtilities.invokeLater(new Runnable() {

            public void run() {
            	LayoutSample ex = new LayoutSample();
                ex.setVisible(true);
            }
        });
    }
}