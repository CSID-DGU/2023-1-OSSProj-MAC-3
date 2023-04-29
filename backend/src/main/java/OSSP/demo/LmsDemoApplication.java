package OSSP.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class LmsDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmsDemoApplication.class, args);
	}

}
