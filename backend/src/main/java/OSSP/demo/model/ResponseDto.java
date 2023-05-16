package OSSP.demo.model;

import lombok.*;

import java.util.List;
import java.util.Map;

//global response dto, error나 data를 담음
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ResponseDto<T> {
    private Map<String, String> error;
    private List<T> data;
}
