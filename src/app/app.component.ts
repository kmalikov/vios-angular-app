import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<div hidden #dataContainer></div><router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  svg: any;
  constructor() {
    console.log(`Build version: ${environment.version}`);
  }

  ngOnInit() {
    this.svg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="return" viewBox="0 0 497.25 497.25"><title>return</title><path d="M248.625,89.25V0l-127.5,127.5l127.5,127.5V140.25c84.15,0,153,68.85,153,153c0,84.15-68.85,153-153,153 c-84.15,0-153-68.85-153-153h-51c0,112.2,91.8,204,204,204s204-91.8,204-204S360.825,89.25,248.625,89.25z"/></symbol><symbol id="home" viewBox="0 0 510 510"><title>home</title><polygon points="204,471.75 204,318.75 306,318.75 306,471.75 433.5,471.75 433.5,267.75 510,267.75 255,38.25 0,267.75 76.5,267.75 76.5,471.75 "/></symbol><symbol id="folder" viewBox="0 0 510 510"><title>folder</title><path d="M204,51H51C22.95,51,0,73.95,0,102v306c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V153c0-28.05-22.95-51-51-51 H255L204,51z"/></symbol><symbol id="expand" viewBox="0 0 306 306"><title>expand</title><polygon points="153,58.65 0,211.65 35.7,247.35 153,130.05 270.3,247.35 306,211.65 "/></symbol><symbol id="clipboard" viewBox="0 0 561 561"><title>clipboard</title><path d="M459,51H351.9c-10.2-30.6-38.25-51-71.4-51c-33.15,0-61.2,20.4-71.4,51H102c-28.05,0-51,22.95-51,51v408 c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V102C510,73.95,487.05,51,459,51z M280.5,51c15.3,0,25.5,10.2,25.5,25.5 S295.8,102,280.5,102S255,91.8,255,76.5S265.2,51,280.5,51z M459,510H102V102h51v76.5h255V102h51V510z"/></symbol><symbol id="share" viewBox="0 0 507.45 507.45"><title>share</title><path d="M408,178.5c-20.4,0-38.25,7.65-51,20.4L175.95,94.35c2.55-5.1,2.55-12.75,2.55-17.85C178.5,33.15,145.35,0,102,0 S25.5,33.15,25.5,76.5S58.65,153,102,153c20.4,0,38.25-7.65,51-20.4l181.05,104.55c-2.55,5.1-2.55,12.75-2.55,17.85 c0,5.1,0,12.75,2.55,17.85L153,379.95c-12.75-12.75-30.6-20.4-51-20.4c-40.8,0-73.95,33.15-73.95,73.95S61.2,507.45,102,507.45 s73.95-33.15,73.95-73.95c0-5.1,0-10.2-2.55-17.85L354.45,308.55c12.75,12.75,30.6,20.4,51,20.4c43.35,0,76.5-33.15,76.5-76.5 C481.95,209.1,451.35,178.5,408,178.5z"/></symbol><symbol id="document" viewBox="0 0 510 510"><title>document</title><path d="M102,0C73.95,0,51,22.95,51,51v408c0,28.05,22.95,51,51,51h306c28.05,0,51-22.95,51-51V153L306,0H102z M280.5,178.5V38.25 L420.75,178.5H280.5z"/></symbol><symbol id="add" viewBox="0 0 561 561"><title>add</title><path d="M51,102H0v408c0,28.05,22.95,51,51,51h408v-51H51V102z M510,0H153c-28.05,0-51,22.95-51,51v357c0,28.05,22.95,51,51,51 h357c28.05,0,51-22.95,51-51V51C561,22.95,538.05,0,510,0z M459,255H357v102h-51V255H204v-51h102V102h51v102h102V255z"/></symbol><symbol id="bookmark" viewBox="0 0 459 459"><title>bookmark</title><path d="M357,0H102C73.95,0,51,22.95,51,51v408l178.5-76.5L408,459V51C408,22.95,385.05,0,357,0z M357,382.5l-127.5-56.1 L102,382.5V51h255V382.5z"/></symbol><symbol id="add-1" viewBox="0 0 510 510"><title>add-1</title><path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,459 c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"/><path d="M280.5,229.5V153h-51v76.5H153v51h76.5V357h51v-76.5H357v-51H280.5z"/></symbol><symbol id="indicator" viewBox="0 0 316.2 316.2"><title>indicator</title><path d="M158.1,71.4l117.3,117.3l35.7-35.7L158.1,0L5.1,153l35.7,35.7L158.1,71.4z M5.1,316.2h306v-51H5.1V316.2z"/></symbol><symbol id="hide" viewBox="0 0 459 459"><title>hide</title><path d="M153,102h-51v51h51V102z M153,204h-51v51h51V204z M153,0c-28.05,0-51,22.95-51,51h51V0z M255,306h-51v51h51V306z M408,0 v51h51C459,22.95,436.05,0,408,0z M255,0h-51v51h51V0z M153,357v-51h-51C102,334.05,124.95,357,153,357z M408,255h51v-51h-51V255z M408,153h51v-51h-51V153z M408,357c28.05,0,51-22.95,51-51h-51V357z M51,102H0v51l0,0v255c0,28.05,22.95,51,51,51h306v-51H51V102 z M306,51h51V0h-51V51z M306,357h51v-51h-51V357z"/></symbol><symbol id="right-arrow" viewBox="0 0 459 459"><title>right-arrow</title><path d="M408,0H51C22.95,0,0,22.95,0,51v102l0,0v153l0,0v102c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V51 C459,22.95,436.05,0,408,0z M204,357v-76.5H51v-102h153V102l127.5,127.5L204,357z"/></symbol><symbol id="back" viewBox="0 0 306 306"><title>back</title><polygon points="247.35,270.3 130.05,153 247.35,35.7 211.65,0 58.65,153 211.65,306 "/></symbol><symbol id="more" viewBox="0 0 408 408"><title>more</title><path d="M51,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S79.05,153,51,153z M357,153c-28.05,0-51,22.95-51,51 s22.95,51,51,51s51-22.95,51-51S385.05,153,357,153z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51 S232.05,153,204,153z"/></symbol><symbol id="close" viewBox="0 0 357 357"><title>close</title><polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5 "/></symbol><symbol id="adjust" viewBox="0 0 507.451 507.45"><title>adjust</title><path d="M440.813,280.5c0-7.65,2.55-15.3,2.55-25.5s0-17.85-2.55-25.5l53.55-43.35c5.1-5.1,5.1-10.2,2.55-15.3l-51-89.25 c-2.55-2.55-7.649-5.1-15.3-2.55l-63.75,25.5c-12.75-10.2-28.05-17.85-43.35-25.5l-10.2-66.3C315.863,5.1,308.212,0,303.113,0 h-102c-5.101,0-12.75,5.1-12.75,10.2l-10.2,68.85c-15.3,5.1-28.05,15.3-43.35,25.5l-61.2-25.5c-7.65-2.55-12.75,0-17.851,5.1 l-51,89.25c-2.55,2.55,0,10.2,5.1,15.3l53.55,40.8c0,7.65-2.55,15.3-2.55,25.5s0,17.85,2.55,25.5l-53.55,43.35 c-5.1,5.101-5.1,10.2-2.55,15.301l51,89.25c2.55,2.55,7.649,5.1,15.3,2.55l63.75-25.5c12.75,10.2,28.05,17.85,43.35,25.5 l10.2,66.3c0,5.1,5.1,10.2,12.75,10.2h102c5.101,0,12.75-5.101,12.75-10.2l10.2-66.3c15.3-7.65,30.6-15.3,43.35-25.5l63.75,25.5 c5.101,2.55,12.75,0,15.301-5.101l51-89.25c2.55-5.1,2.55-12.75-2.551-15.3L440.813,280.5z M252.113,344.25 c-48.45,0-89.25-40.8-89.25-89.25s40.8-89.25,89.25-89.25s89.25,40.8,89.25,89.25S300.563,344.25,252.113,344.25z"/></symbol><symbol id="next" viewBox="0 0 408 408"><title>next</title><polygon points="204,0 168.3,35.7 311.1,178.5 0,178.5 0,229.5 311.1,229.5 168.3,372.3 204,408 408,204 "/></symbol><symbol id="content" viewBox="0 0 561 561"><title>content</title><path d="M395.25,0h-306c-28.05,0-51,22.95-51,51v357h51V51h306V0z M471.75,102h-280.5c-28.05,0-51,22.95-51,51v357 c0,28.05,22.95,51,51,51h280.5c28.05,0,51-22.95,51-51V153C522.75,124.95,499.8,102,471.75,102z M471.75,510h-280.5V153h280.5V510 z"/></symbol><symbol id="coin" viewBox="0 0 401.601 401.6"><title>coin</title><path d="M116.682,229.329c11.286,0,22.195-0.729,32.518-2.086V114.094c-10.322-1.356-21.232-2.085-32.518-2.085 c-64.441,0-116.681,23.693-116.681,52.921v11.477C0.001,205.634,52.241,229.329,116.682,229.329z"/><path d="M116.682,288.411c11.286,0,22.195-0.729,32.518-2.084v-33.166c-10.325,1.356-21.229,2.095-32.518,2.095 c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.5-2.454,7.124-2.454,10.839v11.477 C0.001,264.718,52.241,288.411,116.682,288.411z"/><path d="M149.199,314.823v-2.578c-10.325,1.356-21.229,2.095-32.518,2.095c-56.25,0-103.199-18.054-114.227-42.082 C0.848,275.757,0,279.381,0,283.096v11.477c0,29.229,52.24,52.922,116.681,52.922c12.887,0,25.282-0.95,36.873-2.7 c-2.873-5.877-4.355-12.075-4.355-18.496V314.823z"/><path d="M284.92,22.379c-64.441,0-116.681,23.693-116.681,52.921v11.477c0,29.228,52.24,52.921,116.681,52.921 c64.44,0,116.681-23.693,116.681-52.921V75.3C401.601,46.072,349.36,22.379,284.92,22.379z"/><path d="M284.92,165.626c-56.25,0-103.199-18.053-114.227-42.082c-1.606,3.499-2.454,7.123-2.454,10.839v11.477 c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.477c0-3.716-0.848-7.34-2.454-10.839 C388.119,147.573,341.17,165.626,284.92,165.626z"/><path d="M284.92,224.71c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.499-2.454,7.123-2.454,10.839v11.477 c0,29.229,52.24,52.922,116.681,52.922c64.44,0,116.681-23.693,116.681-52.922v-11.477c0-3.716-0.848-7.34-2.454-10.839 C388.119,206.657,341.17,224.71,284.92,224.71z"/><path d="M284.92,286.983c-56.25,0-103.199-18.054-114.227-42.082c-1.606,3.5-2.454,7.123-2.454,10.838v11.478 c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.478c0-3.715-0.848-7.34-2.454-10.838 C388.119,268.928,341.17,286.983,284.92,286.983z"/><path d="M284.92,346.066c-56.25,0-103.199-18.053-114.227-42.081c-1.606,3.5-2.454,7.125-2.454,10.838V326.3 c0,29.228,52.24,52.921,116.681,52.921c64.44,0,116.681-23.693,116.681-52.921v-11.478c0-3.715-0.848-7.34-2.454-10.838 C388.119,328.012,341.17,346.066,284.92,346.066z"/></symbol><symbol id="wallet" viewBox="0 0 469.341 469.341"><title>wallet</title><path d="M437.337,384.007H362.67c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333h74.667 c5.896,0,10.667-4.771,10.667-10.667v-32c0-22.368-17.35-40.559-39.271-42.323l-61.26-107 c-5.677-9.896-14.844-16.969-25.813-19.906c-10.917-2.917-22.333-1.385-32.104,4.302L79.553,128.007H42.67 c-23.531,0-42.667,19.135-42.667,42.667v256c0,23.531,19.135,42.667,42.667,42.667h362.667c23.531,0,42.667-19.135,42.667-42.667 v-32C448.004,388.778,443.233,384.007,437.337,384.007z M360.702,87.411l23.242,40.596h-92.971L360.702,87.411z M121.953,128.007 L300.295,24.184c4.823-2.823,10.458-3.573,15.844-2.135c5.448,1.458,9.99,4.979,12.813,9.906l0.022,0.039l-164.91,96.013H121.953 z"/><path d="M437.337,234.674H362.67c-35.292,0-64,28.708-64,64c0,35.292,28.708,64,64,64h74.667c17.646,0,32-14.354,32-32v-64 C469.337,249.028,454.983,234.674,437.337,234.674z M362.67,320.007c-11.76,0-21.333-9.573-21.333-21.333 c0-11.76,9.573-21.333,21.333-21.333c11.76,0,21.333,9.573,21.333,21.333C384.004,310.434,374.431,320.007,362.67,320.007z"/></symbol><symbol id="tag-black-shape" viewBox="0 0 432.544 432.544"><title>tag-black-shape</title><path d="M421.985,229.833L217.847,25.981c-7.235-7.238-16.94-13.374-29.121-18.416C176.541,2.522,165.407,0,155.318,0H36.547 C26.648,0,18.083,3.619,10.85,10.848C3.617,18.081,0.002,26.646,0.002,36.545v118.771c0,10.088,2.519,21.219,7.564,33.404 s11.182,21.792,18.417,28.837L230.118,421.98c7.043,7.043,15.602,10.564,25.697,10.564c9.89,0,18.558-3.521,25.98-10.564 l140.186-140.47c7.043-7.046,10.561-15.604,10.561-25.693C432.542,245.919,429.024,237.258,421.985,229.833z M117.202,117.201 c-7.142,7.138-15.752,10.709-25.841,10.709c-10.085,0-18.699-3.571-25.837-10.709c-7.138-7.139-10.706-15.749-10.706-25.837 c0-10.089,3.568-18.702,10.706-25.837c7.139-7.139,15.752-10.71,25.837-10.71c10.089,0,18.702,3.571,25.841,10.71 c7.135,7.135,10.706,15.749,10.706,25.837C127.908,101.452,124.341,110.062,117.202,117.201z"/></symbol></svg>`
    this.dataContainer.nativeElement.innerHTML = this.svg;
  }
}
