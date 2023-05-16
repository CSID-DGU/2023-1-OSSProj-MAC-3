package OSSP.demo.service.find;

import OSSP.demo.entity.File;
import OSSP.demo.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileFindService {

    private final FileRepository fileRepository;

//    @Transactional
//    public Page<File> findAllFile(Pageable pageable, String studentId){
//
//
//
//        return
//    }
}
