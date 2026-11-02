/* ============================================================
   全站交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 移动端菜单 ---------- */
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('on');
      links.classList.toggle('on');
      burger.setAttribute('aria-expanded', burger.classList.contains('on') ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('on');
        links.classList.remove('on');
      });
    });
  }

  /* ---------- 导航滚动阴影 ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 滚动出现动画 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i, 6) * 55) + 'ms';
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- 折叠面板 ---------- */
  document.querySelectorAll('.acc-item').forEach(function (item) {
    var btn = item.querySelector('.acc-btn');
    var panel = item.querySelector('.acc-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // 同组手风琴：关闭兄弟项
      var group = item.parentElement;
      if (group && group.hasAttribute('data-acc-group')) {
        Array.prototype.forEach.call(group.children, function (sib) {
          if (sib !== item && sib.classList.contains('open')) {
            sib.classList.remove('open');
            var p = sib.querySelector('.acc-panel');
            if (p) p.style.maxHeight = '0px';
            var b = sib.querySelector('.acc-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
      }
      if (isOpen) {
        item.classList.remove('open');
        panel.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- 侧栏滚动高亮 ---------- */
  var sideLinks = document.querySelectorAll('.side-list a[href^="#"]');
  if (sideLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    sideLinks.forEach(function (a) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) map[t.id] = a;
    });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          sideLinks.forEach(function (a) { a.classList.remove('on'); });
          if (map[e.target.id]) map[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-88px 0px -70% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) {
      so.observe(document.getElementById(id));
    });
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 表格横向提示 ---------- */
  document.querySelectorAll('.tbl-scroll').forEach(function (box) {
    if (box.scrollWidth > box.clientWidth + 4) box.classList.add('scrollable');
  });
})();
