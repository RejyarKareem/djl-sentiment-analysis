package ch.zhaw.deeplearningjava.playground;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class SentimentController {

    private SentimentAnalysis analysis = new SentimentAnalysis();

    @GetMapping("/ping")
    public String ping() {
        return "Sentiment app is up and running!";
    }

    @GetMapping("/count")
    public int count() {
        return 42;
    }

    @GetMapping("/sentiment")
    public String predict(@RequestParam(name="text", required = true) String text) throws Exception {
        var result = analysis.predict(text);
        return result.toJson();
    }
    
    @GetMapping("/info")
    public Map<String, String> getVersionInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("javaVersion", System.getProperty("java.version"));
        info.put("springBootVersion", org.springframework.boot.SpringBootVersion.getVersion());
        return info;
    }
    
}