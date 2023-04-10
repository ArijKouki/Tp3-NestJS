import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { SkillEntity } from "./entities/skill.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  async add(skillData: CreateSkillDto): Promise<SkillEntity> {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }

  async findAll(): Promise<SkillEntity[]> {
    return this.skillRepository.find();
  }

  async findOne(id: number): Promise<SkillEntity> {
    return this.skillRepository.findOneById(id);
  }

  async update(id: number, skillData: UpdateSkillDto): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOneById(id);
    this.skillRepository.merge(skill, skillData);
    return this.skillRepository.save(skill);
  }

  async delete(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
