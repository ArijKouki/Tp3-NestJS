import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>,
  ) {}

  async add(cv: CreateCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }

  async findAll(): Promise<CvEntity[]> {
    return await this.cvRepository.find({ relations: ['skills'] });
  }

  /*async findOne(id: number): Promise<CvEntity> {
    return await this.cvRepository.findOne(id, { relations: ['skills'] });
  }*/

  async update(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    const existingCv = await this.cvRepository.findOneById(id);
    if (!existingCv) {
      return null;
    }
    this.cvRepository.merge(existingCv, cv);
    return await this.cvRepository.save(cv);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.cvRepository.delete(id);
    return result.affected > 0;
  }
}
