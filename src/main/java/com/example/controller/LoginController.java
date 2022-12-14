package com.example.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.form.LoginForm;
import com.example.model.Company;
import com.example.model.MUser;
import com.example.model.UserCompany;
import com.example.model.view.MainViewMUser;
import com.example.service.CompanyService;
import com.example.service.UserCompanyService;
import com.example.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * ログイン画面に遷移するためのコントローラー
 * "/sharejob"に飛ぶようにしてください
 * @author akiyamashuuhei
 *
 */

@RestController
@RequestMapping("/index")
@Slf4j
public class LoginController {
	

	/**
	 * ユーザの情報を取得するサービスのクラス
	 */
    
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserCompanyService userCompanyService;
	
	@Autowired
    private CompanyService companyService;

	/**
	 * プロフィールの情報を返す。プロフィール情報は人によって違うのでリクエストするパラメータも人によって変わってくるので正規表現{userId:.+}
	 * を用いる
	 * @param userId ユーザID リクエストに対応するものを自動で撮ってきてくれる
	 * @return json形式でユーザIDとパスワードが帰ってくる
	 */
	@GetMapping("/login")
	public MainViewMUser getLogin(Model model, Locale locale, @ModelAttribute LoginForm form,BindingResult bindingResult) {
		//IDに合致するMuserをサービスから取得
		MUser user = userService.getUserOne(form.getUserId());
		List<UserCompany> userCompanys = userCompanyService.getUserCompany(form.getUserId());
		List<Company> companys = new ArrayList<>();
		for(UserCompany userCompany:userCompanys) {
			String companyId = userCompany.getUserCompanyKey().getCompanyId();
			Company company = companyService.getCompany(companyId);
			companys.add(company);
		}
		
		MainViewMUser mvUser = new MainViewMUser(user,companys,userCompanys);
		log.info(mvUser.toString());
		return mvUser;
	        
	}


}
