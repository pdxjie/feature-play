package com.pdx.utils;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import cn.hutool.log.Log;
import com.alibaba.fastjson.JSON;
import com.pdx.dto.*;
import com.pdx.toBean.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import sun.applet.Main;

import javax.annotation.Resource;
import java.io.Console;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.TimeUnit;
import java.util.zip.Adler32;

/**
 * @Author: 派大星
 * @Date: 2023/03/31 2023/3/31
 * @Description: 解析
 */
@Component
public class ParserHtmlUtils {

    @Resource
    public RedisTemplate redisTemplate;

    //小说 ------------------start

    public List<NovelRecommendBean> recommendNovel(){
        List<NovelRecommendBean> recommendNovels = new ArrayList<>();
        //从Redis中获取，如果存在就直接返回
        recommendNovels = (List<NovelRecommendBean>) redisTemplate.opsForValue().get("recommendNovels");
        if (null == recommendNovels || recommendNovels.size() == 0){
            String url = "http://www.biquge5200.cc/";
            Document document = null;
            List<NovelRecommendBean> list = new ArrayList<>();
            try {
                document = Jsoup.parse(new URL(url), 100000);
                Elements elements = document.getElementsByClass("l");
                for (Element element : elements) {
                    Elements items = element.getElementsByClass("item");
                    for (Element item : items) {
                        Elements images = item.getElementsByClass("image");
                        for (Element image : images) {
                            NovelRecommendBean novelRecommendBean = new NovelRecommendBean();
                            String href = image.getElementsByTag("a").eq(0).attr("href");
                            String src = image.getElementsByTag("img").eq(0).attr("src");
                            String alt = image.getElementsByTag("img").eq(0).attr("alt");
                            novelRecommendBean.setHref(href.contains("http")?href:"http://www.biquge5200.cc"+href);
                            novelRecommendBean.setTitle(alt);
                            novelRecommendBean.setImgUrl(src);
                            list.add(novelRecommendBean);
                        }
                    }
                }

                //第二部分
                Elements novelslist = document.getElementsByClass("novelslist");
                for (Element element : novelslist) {
                    Elements byClass = element.getElementsByClass("top");
                    for (Element aClass : byClass) {
                        NovelRecommendBean novelRecommendBean = new NovelRecommendBean();
                        String src = aClass.getElementsByTag("img").eq(0).attr("src");
                        String alt = aClass.getElementsByTag("img").eq(0).attr("alt");
                        String href = aClass.getElementsByTag("a").eq(0).attr("href");
                        novelRecommendBean.setImgUrl(src);
                        novelRecommendBean.setHref(href.contains("http")?href:"http://www.biquge5200.cc"+href);
                        novelRecommendBean.setTitle(alt);
                        list.add(novelRecommendBean);
                    }
                }

                redisTemplate.opsForValue().set("recommendNovels",list,2, TimeUnit.DAYS);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return recommendNovels;
    }


    public Map<String,Object> novelDetail(String href){
        NovelDetail novelDetail1 = (NovelDetail) redisTemplate.opsForValue().get("novelDetail:"+href);
        String chaptersJsonStr = (String) redisTemplate.opsForValue().get("chapters:" + href);
        if (null == novelDetail1 && StringUtils.isEmpty(chaptersJsonStr)){
            Document document = null;
            NovelDetail novelDetail = new NovelDetail();
            List<NovelChapter> chapters = new ArrayList<>();
            try {
                document = Jsoup.parse(new URL(href), 100000);
                Element fmimg = document.getElementById("fmimg");
                String src = fmimg.getElementsByTag("img").eq(0).attr("src");
                novelDetail.setImgUrl(src);
                Element maininfo = document.getElementById("maininfo");
                Element info = maininfo.getElementById("info");
                String title = info.getElementsByTag("h1").text();
                novelDetail.setNovelName(title);
                String author = info.getElementsByTag("p").eq(0).text();
                novelDetail.setAuthor(author);
                Element intro = maininfo.getElementById("intro");
                String desc = intro.getElementsByTag("p").text();
                novelDetail.setDesc(desc);

                Elements box_con = document.getElementsByClass("box_con");
                for (Element element : box_con) {
                    Elements elements = element.getElementsByTag("dl");
                    for (Element ele : elements) {
                        String text = ele.getElementsByTag("dt").eq(1).text();
                        novelDetail.setTitle(text);
                        Elements byTag = ele.getElementsByTag("dd");
                        for (Element el : byTag) {
                            NovelChapter novelChapter = new NovelChapter();
                            String url = el.getElementsByTag("a").eq(0).attr("href");
                            String chapterName = el.getElementsByTag("a").eq(0).text();
                            novelChapter.setLink(url.contains("http")?url:"http://www.biquge5200.cc"+url);
                            novelChapter.setTitle(chapterName);
                            chapters.add(novelChapter);
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            chapters = Collections.synchronizedList(chapters.subList(9, chapters.size()));
            String chaptersJson = JSON.toJSONString(chapters);
            redisTemplate.opsForValue().set("novelDetail:"+href,novelDetail,2,TimeUnit.DAYS);
            redisTemplate.opsForValue().set("chapters:"+href,chaptersJson,2,TimeUnit.DAYS);

            Map<String,Object> result = new HashMap<>();
            result.put("novelDetail",novelDetail);
            result.put("chapters",chapters);
            return result;
        }
        List<NovelChapter> chapters = JSON.parseArray(chaptersJsonStr, NovelChapter.class);
        Map<String,Object> result = new HashMap<>();
        result.put("novelDetail",novelDetail1);
        result.put("chapters",chapters);
        return result;
    }

    public NovelContent novelContent(String href){
        NovelContent novelContent = new NovelContent();
        Document document = null;
        try {
            document = Jsoup.parse(new URL(href), 100000);
            String title = document.getElementsByClass("bookname").get(0).getElementsByTag("h1").eq(0).text();
            novelContent.setTitle(title);
            // title
            System.out.println(title);
            Elements bottem1 = document.getElementsByClass("bottem1");
            for (Element element : bottem1) {
                Elements aTags = element.getElementsByTag("a");
                String preHref = aTags.eq(1).attr("href");
                String currentNovelHref = aTags.eq(2).attr("href");
                String nextHref = aTags.eq(3).attr("href");

                novelContent.setPrevHref(preHref.contains("http")?preHref:"http://www.biquge5200.cc"+preHref);
                novelContent.setCurrentHref(currentNovelHref.contains("http")?currentNovelHref:"http://www.biquge5200.cc"+currentNovelHref);
                novelContent.setNextHref(nextHref.contains("http")?nextHref:"http://www.biquge5200.cc"+nextHref);
            }
            Element content = document.getElementById("content");
            Elements pTags = content.getElementsByTag("p");
            List<String> para = new ArrayList<>();
            for (Element pTag : pTags) {
                para.add(pTag.html());
            }
            novelContent.setContent(para);
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(novelContent);
        return novelContent;
    }


    public List<String> searchNovel(String keywords){
        String encodeUrl = URLEncoder.encode(keywords);
        String url = "http://www.biquge5200.cc/modules/article/search.php?searchkey="+encodeUrl;
        Document document = null;
        try {
            document = Jsoup.parse(new URL(url), 100000);
            Elements tbody = document.getElementsByTag("tbody");
            for (Element element : tbody) {
                Elements tr = element.getElementsByTag("tr");
                for (Element ele : tr) {
                    Elements tds = ele.getElementsByTag("td");
                    for (Element td : tds) {
                        System.out.println(td.html());
                    }
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    public static void main(String[] args) throws Exception {
        ParserHtmlUtils parserHtmlUtils = new ParserHtmlUtils();
        parserHtmlUtils.searchNovel("斗罗大陆");
    }


    //小说 ------------------end


    //菜谱 ------------------start

    public List<MenuBean> parseRising(){
        String url = "https://www.xiachufang.com/explore/rising/";
        Document document = null;
        List<MenuBean> list = new ArrayList<>();
        try {
            document = Jsoup.parse(new URL(url), 100000);
            Elements elements = document.getElementsByClass("normal-recipe-list");
            for (Element element : elements) {
                Elements elementsByTag = element.getElementsByTag("li");
                for (Element ele : elementsByTag) {
                    String href = "https://www.xiachufang.com"+ele.getElementsByTag("a").eq(0).attr("href");
                    String imgUrl = ele.getElementsByTag("img").eq(0).attr("data-src");
                    String menuName = ele.getElementsByTag("img").eq(0).attr("alt");
                    MenuBean menuBean = new MenuBean();
                    menuBean.setMenuName(menuName);
                    menuBean.setHref(href);
                    menuBean.setImgUrl(imgUrl);
                    list.add(menuBean);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    public MenuDetails menuDetail(String href){
        Document document = null;
        MenuDetails menuDetails = new MenuDetails();
        try {
            document = Jsoup.parse(new URL(href), 100000);
            String title = document.getElementsByClass("page-title").eq(0).text();
            menuDetails.setTitle(title);
            Elements elementsByClass = document.getElementsByClass("recipe-show");
            for (Element byClass : elementsByClass) {
                Elements elements = byClass.getElementsByClass("block-negative-margin");
                String imgUrl = elements.get(0).getElementsByTag("img").attr("src");
                menuDetails.setImgUrl(imgUrl);
                Elements tableEls = byClass.getElementsByTag("table");
                List<MixtureInfo> mixtureInfos = new ArrayList<>();
                for (Element tableEl : tableEls) {
                    Elements trs = tableEl.getElementsByTag("tr");
                    for (Element tr : trs) {
                        MixtureInfo mixtureInfo = new MixtureInfo();
                        String name = tr.getElementsByClass("name").text();
                        String unit = tr.getElementsByClass("unit").text();
                        mixtureInfo.setMixtureName(name);
                        mixtureInfo.setMeasure(unit);
                        mixtureInfos.add(mixtureInfo);
                    }
                }
                menuDetails.setMixtureInfos(mixtureInfos);
                List<Steps> list = new ArrayList<>();
                Elements steps = byClass.getElementsByClass("steps");
                for (Element step : steps) {
                    Elements lis = step.getElementsByTag("li");
                    for (Element li : lis) {
                        Steps ste = new Steps();
                        String desc = li.getElementsByClass("text").text();
                        String src = li.getElementsByTag("img").attr("src");
                        ste.setStepUrl(src);
                        ste.setDesc(desc);
                        list.add(ste);
                    }
                }
                menuDetails.setSteps(list);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return menuDetails;
    }


    public List<SearchMenu> goSearch(String keywords){
        String encodeUrl = URLEncoder.encode(keywords);
        String url = "https://www.xiachufang.com/search/?keyword="+encodeUrl+"&cat=1001";
        Document document = null;
        List<SearchMenu> searchMenus = new ArrayList<>();
        try {
            document = Jsoup.parse(new URL(url).openStream(), "UTF-8", url);
            Elements elementsByClass = document.getElementsByClass("pure-u-3-4 search-result-list");
            for (Element byClass : elementsByClass) {
                Elements list = byClass.getElementsByClass("list");
                for (Element element : list) {
                    Elements byTag = element.getElementsByTag("li");
                    for (Element ele : byTag) {
                        SearchMenu searchMenu = new SearchMenu();
                        String href = "https://www.xiachufang.com"+ele.getElementsByTag("a").eq(0).attr("href");
                        searchMenu.setHref(href);
                        String src = ele.getElementsByTag("img").eq(0).attr("data-src");
                        String name = ele.getElementsByTag("img").eq(0).attr("alt");
                        searchMenu.setImg(src);
                        searchMenu.setTitle(name);
                        String score = ele.getElementsByClass("score").text();
                        searchMenu.setScore(score.split(" ")[0]);

                        Elements eleElementsByClass = ele.getElementsByClass("ing ellipsis");
                        for (Element aClass : eleElementsByClass) {
                            String tag = aClass.getElementsByTag("a").text();
                            List<String> tags = Arrays.asList(tag.split(" "));
                            searchMenu.setTags(tags);
                        }
                        searchMenus.add(searchMenu);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return searchMenus;
    }

    public  Map<String,Object> newAsk(){
        String url = "https://jbk.39.net/";
        Document document = null;
        List<AskBeanDto> askBeanDtos = new ArrayList<>();
        List<MostWatched> mostWatcheds = new ArrayList<>();
        Map<String,Object> result = new HashMap<>();
        try {
            document = Jsoup.parse(new URL(url), 100000);
            Elements hotItem = document.getElementsByClass("hot_item");
            for (Element element : hotItem) {
                AskBeanDto askBeanDto = new AskBeanDto();
                String href = element.getElementsByTag("a").eq(0).attr("href");
                String text1 = element.getElementsByTag("a").eq(0).attr("title");
                String question = element.getElementsByTag("a").eq(1).attr("title");
                askBeanDto.setHref(href);
                askBeanDto.setQuestion(question);
                askBeanDto.setText(text1);
                askBeanDtos.add(askBeanDto);
            }

            Elements tabContentUlCur = document.getElementsByClass("tab_content_ul cur");
            for (Element element : tabContentUlCur) {
                Elements lis = element.getElementsByTag("li");
                for (Element li : lis) {
                    MostWatched mostWatched = new MostWatched();
                    String href = li.getElementsByTag("a").eq(0).attr("href");
                    String title = li.getElementsByTag("a").eq(0).attr("title");
                    mostWatched.setText(title);
                    mostWatched.setHref(href);
                    mostWatcheds.add(mostWatched);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        result.put("askBeanDtos",askBeanDtos);
        result.put("mostWatcheds",mostWatcheds);
        return result;
    }


    public SickDetail sickDetail(String href){

        Document document = null;
        SickDetail sickDetail = new SickDetail();
        try {
            document = Jsoup.parse(new URL(href), 100000);
            Elements informationBox = document.getElementsByClass("information_box");
            for (Element element : informationBox) {
                String src = element.getElementsByClass("information_r").attr("src");
                String text = element.getElementsByClass("information_l").text();
                sickDetail.setSrc(src);
                sickDetail.setDesc(text);
            }

            List<SickCell> list = new ArrayList<>();
            Elements informationUl = document.getElementsByClass("information_ul");
            for (Element element : informationUl) {
                Elements lis = element.getElementsByTag("li");
                for (Element li : lis) {
                    SickCell sickCell = new SickCell();
                    String title = li.getElementsByTag("i").eq(0).text();
                    String val = li.getElementsByTag("span").eq(0).text();
                    sickCell.setVal(val);
                    sickCell.setTitle(title);
                    list.add(sickCell);
                }
            }
            sickDetail.setCells(list.subList(0,list.size()-1));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sickDetail;
    }

    public List<SickSearchBean> searchSick(String keywords){
        String encodeUrl = URLEncoder.encode(keywords);
        String url = "https://jbk.39.net/bw/key="+encodeUrl;
        Document document = null;
        List<SickSearchBean> list = new ArrayList<>();
        try {
            document = Jsoup.parse(new URL(url), 100000);
            Elements resultContent = document.getElementsByClass("result_content");
            for (Element element : resultContent) {
                Elements resultItem = element.getElementsByClass("result_item");
                for (Element els : resultItem) {
                    SickSearchBean sickSearchBean = new SickSearchBean();
                    String href = els.getElementsByClass("result_item_top_l").get(0).getElementsByTag("a").eq(0).attr("href");
                    String title = els.getElementsByClass("result_item_top_l").get(0).getElementsByTag("a").eq(0).attr("title");

                    String itemContent = els.getElementsByClass("result_item_content").get(0).text();
                    String label = els.getElementsByClass("result_item_content_label").get(0).getElementsByTag("span").text();
                    sickSearchBean.setLabel(label);
                    sickSearchBean.setDesc(itemContent);
                    sickSearchBean.setTitle(title);
                    sickSearchBean.setHref(href);
                    List<String> ls = new ArrayList<>();
                    Elements elementsByTag = els.getElementsByClass("result_item_content_label").get(0).getElementsByTag("a");
                    for (Element el : elementsByTag) {
                        String str = el.html().toString();
                        ls.add(str);
                    }
                    sickSearchBean.setList(ls);
                    list.add(sickSearchBean);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }




}
