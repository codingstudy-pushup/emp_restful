package com.example.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EmpController {
    @GetMapping("/")
    public String list(){
        return "emp";
    }
}
