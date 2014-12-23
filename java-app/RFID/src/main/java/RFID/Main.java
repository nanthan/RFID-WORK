package RFID;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;


public class Main{
	public static String RFID = null;
	public static JSONArray array;
	public static Panel form;
	public static ReadRFID readRFID = null;
		
	public static void main(String[] args){
		
		form = new Panel();
		readRFID = new ReadRFID();
		getData();
	
		Runnable task = new Runnable(){
			public void run(){
				readRFID.start();
				while(true){
					try {
						Thread.sleep(500);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					RFID = readRFID.getRFID();
					//System.out.println(RFID);
				}
			}
		};
		
		Thread check = new Thread(task);
		check.start();
		
		
	}
	public static void getData() {
		try {
			HttpClient client = HttpClientBuilder.create().build();
			HttpGet request = new HttpGet("http://localhost:3000/api/employee");
			HttpResponse response = client.execute(request);
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					response.getEntity().getContent()));
			StringBuilder sb = new StringBuilder();
			String line = null;

			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			array = new JSONArray(sb.toString());

		} catch (Exception e) {
		}

	}
	
	

}