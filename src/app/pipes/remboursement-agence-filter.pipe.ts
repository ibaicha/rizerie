import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remboursementAgenceFilter'
})
export class RemboursementAgenceFilterPipe implements PipeTransform {
/*
  transform(value: any, args?: any): any {
    return null;
  }
*/

transform(items: any[], value: string): any[] {
 // if (!items) return [];
  // return items.filter(it => it[field] === value);
  return items.filter((item) => item.id_agence === value);
}

}
/*
export class xRemboursementAgenceFilterPipe implements PipeTransform {
  transform(teachers: Teacher[], searchText: string) {
    return teachers.filter(teacher =&amp;gt; teacher.name.indexOf(searchText) !== -1);
  }
}
*/
