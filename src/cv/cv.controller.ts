import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  add(@Body() createCvDto: CreateCvDto) {
    return this.cvService.add(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }*/

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cvService.delete(+id);
  }
}
